"use server";

import { OpenAI } from "openai";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function aiReviewRequest({ title, description, levelId }) {
  const session = await auth();
  if (!session?.user) {
    return "Please log in to use this feature.";
  }

  const levelStatus = await prisma.user_Level.findUnique({
    where: {
      user_id_level_id: {
        user_id: session.user.id,
        level_id: levelId,
      },
    },
  });

  if (!levelStatus?.unlocked) {
    return "You need to unlock the level before using this feature.";
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_LQ_KEY });
  const prompt = `The following is the title and description of a Data Structures and Algorithms (DSA) problem. The title is the name of the problem, and the description is supposed to explain the problem and provide examples. Your goal is to expand the description with more details, provide additional examples, and make the problem as clear and understandable as possible for the reader.\nTitle: ${title}\nDescription: ${description}\nPlease rewrite and expand the description, add more examples if possible, and ensure the problem statement is clear and comprehensive.\n Don't include title and description in the response. Just provide the expanded description with markdown.\n`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2048,
  });

  return completion.choices[0]?.message?.content || "No response from AI.";
}

export async function aiSummarizeReviewRequest({ reviewText, levelId }) {
  const session = await auth();
  if (!session?.user) {
    return "Please log in to use this feature.";
  }

  const levelStatus = await prisma.user_Level.findUnique({
    where: {
      user_id_level_id: {
        user_id: session.user.id,
        level_id: levelId,
      },
    },
  });

  if (!levelStatus?.unlocked) {
    return "You need to unlock the level before using this feature.";
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_LQ_KEY });
  const prompt = `Summarize the following AI-generated DSA problem review in plain English, focusing only on the key points and omitting any markdown formatting. The summary should be concise and suitable as a personal note for quick reference.\n\nReview:\n${reviewText}\n\nSummary:`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 256,
  });

  return completion.choices[0]?.message?.content || "No summary generated.";
}
