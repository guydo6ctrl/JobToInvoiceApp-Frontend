import { NativeSelect } from "@chakra-ui/react";
import React from "react";

interface Props {
  value: string;
  setNewItem: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectLineItemType = ({ value, setNewItem }: Props) => {
  return (
    <NativeSelect.Root size="sm">
      <NativeSelect.Field name="type" value={value} onChange={setNewItem}>
        <option value="">Select type</option>
        <option value="Labour">Labour</option>
        <option value="Materials">Materials</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};

export default SelectLineItemType;
