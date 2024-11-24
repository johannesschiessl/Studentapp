import { Exam, ExamType, ExamTypeGroup } from "@/types/exams";
import { Subject } from "@/types/subjects";

interface GradeWithWeight {
  grade: number;
  weight: number;
}

function roundGradeToInteger(grade: number): number {
  // Special case for exactly 1.50
  if (grade === 1.5) return 1;

  // For all other cases, if decimal part is > 0.50, round up
  const decimalPart = grade % 1;
  if (decimalPart > 0.5) {
    return Math.ceil(grade);
  }
  // Otherwise round down
  return Math.floor(grade);
}

export function calculateAverageGrade(
  exams: Exam[],
  examTypes: ExamType[],
  examTypeGroups: ExamTypeGroup[],
): number | null {
  // Early return if no data
  if (!exams?.length || !examTypes?.length || !examTypeGroups?.length) {
    return null;
  }

  // Create maps for faster lookups - convert IDs to strings for consistent lookup
  const examTypeMap = new Map(
    examTypes.map((type) => [type.id.toString(), type]),
  );

  const examsByGroup = new Map<string, GradeWithWeight[]>();

  // Initialize groups with string IDs
  examTypeGroups.forEach((group) => {
    examsByGroup.set(group.id.toString(), []);
  });

  // Process exams
  exams.forEach((exam) => {
    if (typeof exam.grade !== "number") return;

    const examType = examTypeMap.get(exam.exam_type_id.toString());
    if (!examType) return;

    const groupId = examType.group_id.toString();
    const groupExams = examsByGroup.get(groupId) || [];

    groupExams.push({
      grade: exam.grade,
      weight: examType.weight || 1, // Default weight to 1 if not specified
    });

    examsByGroup.set(groupId, groupExams);
  });

  // Calculate group averages
  const groupAverages = examTypeGroups
    .map((group) => {
      const groupId = group.id.toString();
      const groupExams = examsByGroup.get(groupId) || [];

      if (groupExams.length === 0) return null;

      const totalWeight = groupExams.reduce(
        (sum, exam) => sum + exam.weight,
        0,
      );
      const weightedSum = groupExams.reduce(
        (sum, exam) => sum + exam.grade * exam.weight,
        0,
      );

      return {
        average: weightedSum / totalWeight,
        weight: group.weight || 1, // Default group weight to 1 if not specified
      };
    })
    .filter(
      (group): group is { average: number; weight: number } => group !== null,
    );

  // Return null if no valid grades
  if (groupAverages.length === 0) return null;

  // Calculate final weighted average
  const totalWeight = groupAverages.reduce(
    (sum, group) => sum + group.weight,
    0,
  );
  const weightedSum = groupAverages.reduce(
    (sum, group) => sum + group.average * group.weight,
    0,
  );

  return Number((weightedSum / totalWeight).toFixed(2));
}

export function calculateTotalAverageGrade(subjects: Subject[]): number | null {
  if (!subjects || !Array.isArray(subjects) || subjects.length === 0)
    return null;

  const subjectsWithGrades = subjects.filter(
    (subject) =>
      subject.average_grade !== null && subject.average_grade !== undefined,
  );

  if (subjectsWithGrades.length === 0) return null;

  const totalGrade = subjectsWithGrades.reduce((sum, subject) => {
    const roundedGrade = roundGradeToInteger(subject.average_grade || 0);
    return sum + roundedGrade;
  }, 0);

  return totalGrade / subjectsWithGrades.length;
}
