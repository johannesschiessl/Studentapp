"use client";

import { useState } from "react";
import { AddExamTypeGroupDialog } from "./add-exam-type-group-dialog";
import { AddExamTypeDialog } from "./add-exam-type-dialog";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import {
  ExamTypeGroup,
  ExamType,
  NewExamType,
  NewExamTypeGroup,
} from "@/types/exams";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/hooks/use-translation";

interface ExamSettingsContentProps {
  initialExamTypeGroups: Omit<ExamTypeGroup, "examTypes">[];
  initialExamTypes: ExamType[];
}

export default function ExamSettingsContent({
  initialExamTypeGroups,
  initialExamTypes,
}: ExamSettingsContentProps) {
  const [examTypeGroups, setExamTypeGroups] = useState<
    Omit<ExamTypeGroup, "examTypes">[]
  >(initialExamTypeGroups);
  const [examTypes, setExamTypes] = useState<ExamType[]>(initialExamTypes);

  const handleAddExamTypeGroup = async (newGroup: NewExamTypeGroup) => {
    const data = await addExamTypeGroup(newGroup);
    const id = data[0].id.toString();
    setExamTypeGroups([...examTypeGroups, { ...newGroup, id }]);
  };

  const handleAddExamType = async (newExamType: NewExamType) => {
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

  const { t } = useTranslation();

  return (
    <div className="container mx-auto mt-5 space-y-4">
      <AddExamTypeGroupDialog onAdd={handleAddExamTypeGroup} />
      <ScrollArea className="h-[300px] w-full">
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
                          {group.name} ({t("settings.exam_type.weight")}:{" "}
                          {group.weight})
                        </CardTitle>
                      </AccordionTrigger>
                      <DeleteConfirmationDialog
                        onDelete={() => handleDeleteExamTypeGroup(group.id)}
                        itemName={`${t("settings.exam_type_group")} "${group.name}"`}
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
                              {examType.name} ({t("settings.exam_type.weight")}{" "}
                              {examType.weight})
                            </span>
                            <DeleteConfirmationDialog
                              onDelete={() => handleDeleteExamType(examType.id)}
                              itemName={`${t("settings.exam_type")}	 "${examType.name}"`}
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
      </ScrollArea>
    </div>
  );
}
