import { Exam, ExamType, ExamTypeGroup } from "@/types/exams";

interface GradeWithWeight {
  grade: number;
  weight: number;
}

export function calculateAverageGrade(
  exams: Exam[],
  examTypes: ExamType[],
  examTypeGroups: ExamTypeGroup[],
): number | null {
  // Create a map of exam types for faster lookup
  const examTypeMap = new Map(examTypes.map((type) => [type.id, type]));

  // Group exams by their type group
  const examsByGroup = new Map<string, GradeWithWeight[]>();

  // Initialize groups
  examTypeGroups.forEach((group) => {
    examsByGroup.set(group.id, []);
  });

  // Process exams with valid grades
  exams.forEach((exam) => {
    if (exam.grade === undefined || exam.grade === null) return;

    const examType = examTypeMap.get(exam.exam_type_id.toString());
    if (!examType) return;

    const groupExams = examsByGroup.get(examType.group_id) || [];

    // Convert grade modifiers to numerical values
    let finalGrade = exam.grade;
    if (exam.grade_modifier === "+") finalGrade += 0.3;
    if (exam.grade_modifier === "-") finalGrade -= 0.3;

    groupExams.push({
      grade: finalGrade,
      weight: examType.weight,
    });
    examsByGroup.set(examType.group_id, groupExams);
  });

  // Calculate weighted average for each group
  const groupAverages = examTypeGroups.map((group) => {
    const groupExams = examsByGroup.get(group.id) || [];
    if (groupExams.length === 0) return null;

    const totalWeight = groupExams.reduce((sum, exam) => sum + exam.weight, 0);
    const weightedSum = groupExams.reduce(
      (sum, exam) => sum + exam.grade * exam.weight,
      0,
    );

    return {
      average: weightedSum / totalWeight,
      weight: group.weight,
    };
  });

  // Filter out groups with no grades
  const validGroupAverages = groupAverages.filter(
    (group): group is { average: number; weight: number } => group !== null,
  );

  if (validGroupAverages.length === 0) return null;

  // Calculate final weighted average
  const totalWeight = validGroupAverages.reduce(
    (sum, group) => sum + group.weight,
    0,
  );
  const weightedSum = validGroupAverages.reduce(
    (sum, group) => sum + group.average * group.weight,
    0,
  );

  return Number((weightedSum / totalWeight).toFixed(2));
}
