import PropTypes from "prop-types";

const TestCase = ({ number, testCase }) => {
  const { hidden, stdin, expectedStdout, stdout, stderr, isJudging } = testCase;
  const attempted = stderr !== undefined || stdout !== undefined;

  // Determine the status of the test case
  const isCorrect = stdout?.trimEnd() === expectedStdout?.trimEnd();

  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="font-bold text-lg flex items-center gap-2">
        Test Case {number}
        {isJudging ? (
          <span className="text-yellow-500">⏳</span> // Hourglass while judging
        ) : attempted ? (
          isCorrect ? (
            <span className="text-green-500">✔</span> // Green checkmark
          ) : (
            <span className="text-red-500">✘</span> // Red X
          )
        ) : null}
      </h3>
      {!hidden && (
        <>
          <div>
            <strong>Input</strong>
            <pre className="inline-terminal">{stdin}</pre>
          </div>
          <div>
            <strong>Expected</strong>
            <pre className="inline-terminal">{expectedStdout}</pre>
          </div>
          <div>
            <strong>Output</strong>
            {stdout !== undefined && (
              <pre className="inline-terminal">
                {stdout}
                <span className="stderr">{stderr}</span>
              </pre>
            )}
          </div>
        </>
      )}
    </div>
  );
};

TestCase.propTypes = {
  number: PropTypes.number.isRequired,
  testCase: PropTypes.shape({
    hidden: PropTypes.bool.isRequired,
    stdin: PropTypes.string.isRequired,
    expectedStdout: PropTypes.string.isRequired,
    stdout: PropTypes.string,
    stderr: PropTypes.string,
    isJudging: PropTypes.bool, // New property to track judging state
  }).isRequired,
};

export default TestCase;