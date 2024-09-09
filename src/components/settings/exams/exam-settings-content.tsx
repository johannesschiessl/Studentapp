"use client";

import { useState } from "react";
import { AddExamTypeGroupDialog } from "./add-exam-type-group-dialog";
import { AddExamTypeDialog } from "./add-exam-type-dialog";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { ExamTypeGroup, ExamType } from "@/types/exams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  addExamType,
  addExamTypeGroup,
  deleteExamType,
  deleteExamTypeGroup,
} from "@/app/actions/exams";

interface ExamSettingsPageProps {
  initialExamTypeGroups: Omit<ExamTypeGroup, "examTypes">[];
  initialExamTypes: ExamType[];
}

export default function ExamSettingsPage({
  initialExamTypeGroups,
  initialExamTypes,
}: ExamSettingsPageProps) {
  const [examTypeGroups, setExamTypeGroups] = useState<
    Omit<ExamTypeGroup, "examTypes">[]
  >(initialExamTypeGroups);
  const [examTypes, setExamTypes] = useState<ExamType[]>(initialExamTypes);

  const handleAddExamTypeGroup = async (
    newGroup: Omit<ExamTypeGroup, "id">,
  ) => {
    const data = await addExamTypeGroup(newGroup);
    const id = data[0].id.toString();
    setExamTypeGroups([...examTypeGroups, { ...newGroup, id }]);
  };

  const handleAddExamType = async (newExamType: Omit<ExamType, "id">) => {
    const data = await addExamType(newExamType);
    const id = data[0].id.toString();
    setExamTypes([...examTypes, { ...newExamType, id }]);
  };

  const handleDeleteExamTypeGroup = (groupId: string) => {
    deleteExamTypeGroup(parseInt(groupId));
    setExamTypeGroups((groups) =>
      groups.filter((group) => group.id !== groupId),
    );
    setExamTypes((types) => types.filter((type) => type.group_id !== groupId));
  };

  const handleDeleteExamType = (examTypeId: string) => {
    deleteExamType(parseInt(examTypeId));
    setExamTypes((types) => types.filter((type) => type.id !== examTypeId));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">Exam Settings</h1>
        <AddExamTypeGroupDialog onAdd={handleAddExamTypeGroup} />
      </div>
      <Accordion type="single" collapsible className="space-y-4">
        {examTypeGroups.map((group) => {
          const groupExamTypes = examTypes.filter(
            (type) => type.group_id === group.id,
          );
          return (
            <AccordionItem key={group.id} value={group.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <AccordionTrigger className="flex-grow">
                      <CardTitle>
                        {group.name} (Weight: {group.weight})
                      </CardTitle>
                    </AccordionTrigger>
                    <DeleteConfirmationDialog
                      onDelete={() => handleDeleteExamTypeGroup(group.id)}
                      itemName={`exam type group "${group.name}"`}
                    />
                  </div>
                </CardHeader>
                <AccordionContent>
                  <CardContent>
                    <ul className="space-y-2">
                      {groupExamTypes.map((examType) => (
                        <li
                          key={examType.id}
                          className="flex items-center justify-between"
                        >
                          <span>
                            {examType.name} (Weight: {examType.weight})
                          </span>
                          <DeleteConfirmationDialog
                            onDelete={() => handleDeleteExamType(examType.id)}
                            itemName={`exam type "${examType.name}"`}
                          />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <AddExamTypeDialog
                        groupId={group.id}
                        onAdd={(newExamType) =>
                          handleAddExamType({
                            ...newExamType,
                            group_id: group.id,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
