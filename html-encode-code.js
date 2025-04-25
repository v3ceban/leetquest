import he from "he";

const pythonCode = `hash_set = {1, 2, 3}
print("hash_set =", hash_set)

hash_set.add(4)
print("after adding 4, hash_set =", hash_set)

hash_set.add(2)
print("after attempting to add 2, hash_set =", hash_set)

hash_set.remove(2)
print("after removing 2, hash_set =", hash_set)

print("3 in hash_set is", 3 in hash_set)
print("2 in hash_set is", 2 in hash_set)`;

let htmlEncoded = he.encode(pythonCode);
htmlEncoded = htmlEncoded.replace(/\n/g, "&#10;");
console.log("<codetrier defaulteditorvalue=\"" + htmlEncoded + "\"></codetrier>");
