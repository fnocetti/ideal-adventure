import { Chip } from "@mui/material";

interface SubjectsChipsProps {
  subjects: string[];
}

export function SubjectsChips({ subjects }: SubjectsChipsProps) {
  const chips: JSX.Element[] = [];
  const uniqueSubjects = new Set(
    subjects.flatMap((subject) => subject.split(" -- "))
  );
  uniqueSubjects.forEach((subject) => {
    chips.push(<Chip key={subject} label={subject} />);
  });

  return chips;
}
