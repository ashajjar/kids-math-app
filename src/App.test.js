import { generateEquations } from './App';

function parseEquation(equation) {
  const match = equation.match(/^(-?\d+)\s*([+\-×÷])\s*(-?\d+)$/);
  if (!match) throw new Error(`Unparseable equation: ${equation}`);
  return { a: Number(match[1]), op: match[2], b: Number(match[3]) };
}

describe('generateEquations', () => {
  test('addition is not clamped by maxResult (max result is a+b)', () => {
    const settings = {
      minNumber: 9,
      maxNumber: 10,
      numEquations: 200,
      operations: { addition: true, subtraction: false, multiplication: false, division: false },
      allowNegativeResults: true,
      isGeneratingCombinations: false,
      // legacy field should be ignored if present
      maxResult: 10,
    };

    const equations = generateEquations(settings);
    expect(equations.length).toBeGreaterThan(0);

    // With 9..10, we should see at least one equation whose result is > 10
    const hasOverTen = equations.some((eq) => {
      const { a, op, b } = parseEquation(eq);
      return op === '+' && (a + b) > 10;
    });

    expect(hasOverTen).toBe(true);
  });

  test('division never generates a zero divisor and stays integer', () => {
    const settings = {
      minNumber: 0,
      maxNumber: 10,
      numEquations: 200,
      operations: { addition: false, subtraction: false, multiplication: false, division: true },
      allowNegativeResults: true,
      isGeneratingCombinations: false,
    };

    const equations = generateEquations(settings);
    for (const eq of equations) {
      const { a, op, b } = parseEquation(eq);
      expect(op).toBe('÷');
      expect(b).not.toBe(0);
      expect(a % b).toBe(0);
    }
  });
});
