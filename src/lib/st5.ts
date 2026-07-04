export function calculateScore(answers: number[]) {
  return answers.reduce((sum, score) => sum + score, 0);
}

export function calculateStressLevel(score: number) {
  if (score <= 4) {
    return "LOW";
  }

  if (score <= 7) {
    return "MEDIUM";
  }

  if (score <= 9) {
    return "HIGH";
  }

  return "HIGH";
}