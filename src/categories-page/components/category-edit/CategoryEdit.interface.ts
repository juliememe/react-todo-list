import React from "react";

export interface CategoryEditProps {
  editable: boolean | undefined;
  saveCategory: (e: React.SyntheticEvent) => void;
  saveInputData: (e: React.SyntheticEvent) => void;
  inputData: string;
  categoryTitle: string;
}
