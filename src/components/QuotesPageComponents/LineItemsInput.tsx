import {
  Button,
  Box,
  Text,
  Input,
  VStack,
  HStack,
  NativeSelect,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import SelectLineItemType from "../General/SelectLineItemType";
import { brand } from "../../constants";

export interface LineItem {
  name: string;
  description: string;
  quantity: number | null;
  unit_price: number | null;
  type: string;
  saveAsTemplate: boolean;
}

interface LineItemsInputProps {
  lineItems: LineItem[];
  onChange: (items: LineItem[]) => void;
  clientId: string;
  selectedTemplate?: any;
}

const defaultNewItem = {
  name: "",
  description: "",
  quantity: null,
  unit_price: null,
  type: "Type",
  saveAsTemplate: false,
};

const LineItemsInput = ({
  lineItems,
  onChange,
  clientId,
  selectedTemplate,
}: LineItemsInputProps) => {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState(defaultNewItem);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<LineItem | null>(null);

  useEffect(() => {
    if (selectedTemplate) {
      onChange([
        ...lineItems,
        {
          name: selectedTemplate.name,
          description: selectedTemplate.description,
          quantity: 1,
          unit_price: parseFloat(selectedTemplate.unit_price),
          type: selectedTemplate.type,
          saveAsTemplate: false,
        },
      ]);
    }
  }, [selectedTemplate]);

  const handleNumberChange =
    (field: "quantity" | "unit_price", isEditing: boolean = false) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === "" ? null : Number(e.target.value);
      if (isEditing && editItem) {
        setEditItem({ ...editItem, [field]: value });
      } else {
        setNewItem({ ...newItem, [field]: value });
      }
    };

  const addLineItem = async () => {
    if (newItem.description && newItem.unit_price !== null) {
      if (newItem.saveAsTemplate) {
        await api.post("/templates/", {
          name: newItem.name,
          description: newItem.description,
          unit_price: newItem.unit_price,
          type: newItem.type,
          client_id: Number(clientId),
        });
      }

      onChange([...lineItems, newItem]);
      setNewItem(defaultNewItem);
      setShowForm(false);
    }
  };

  const saveEdit = () => {
    if (editingIdx !== null && editItem) {
      const updated = [...lineItems];
      updated[editingIdx] = editItem;
      onChange(updated);
      setEditingIdx(null);
      setEditItem(null);
    }
  };

  const startEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditItem({ ...lineItems[idx]! });
  };

  return (
    <Box>
      {/* Display existing items */}
      <VStack mb={4}>
        {lineItems.map((item, idx) => (
          <Box key={idx} bg="white" p={3} w="full" borderRadius="md">
            {editingIdx === idx && editItem ? (
              // Edit mode
              <VStack gap={2} align="stretch">
                <Input
                  placeholder="Name"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  size="sm"
                />
                <Input
                  placeholder="Description"
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                  size="sm"
                />
                <HStack gap={2} align="center">
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={editItem.quantity ?? ""}
                    onChange={handleNumberChange("quantity", true)}
                    size="sm"
                  />
                  <Input
                    type="number"
                    placeholder="Unit Price"
                    value={editItem.unit_price ?? ""}
                    onChange={handleNumberChange("unit_price", true)}
                    size="sm"
                  />
                  <SelectLineItemType
                    value={editItem.type}
                    setNewItem={(e) =>
                      setEditItem({ ...editItem, type: e.target.value })
                    }
                  />
                </HStack>
                <HStack gap={2}>
                  <Button size="sm" colorPalette="green" onClick={saveEdit}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingIdx(null);
                      setEditItem(null);
                    }}
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            ) : (
              // View mode
              <HStack justify="space-between">
                <HStack align="center" gap={7} flex={1}>
                  <Text fontWeight="bold" minW="120px">
                    {item.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {item.description}
                  </Text>
                </HStack>
                <HStack gap={7}>
                  <Text fontSize="sm" color="gray.600">
                    {item.type}
                  </Text>
                  <HStack align="end" gap={7} fontSize="sm">
                    <Text>
                      {item.quantity} × £{item.unit_price}
                    </Text>
                    <Text fontWeight="bold">
                      Total: £
                      {((item.unit_price ?? 0) * (item.quantity ?? 0)).toFixed(
                        2,
                      )}
                    </Text>
                  </HStack>
                </HStack>
                <HStack gap={1}>
                  <Button
                    size="sm"
                    px={2}
                    py={1}
                    fontSize="xs"
                    colorPalette={brand}
                    onClick={() => startEdit(idx)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    px={2}
                    py={1}
                    fontSize="xs"
                    colorPalette="red"
                    onClick={() =>
                      onChange(lineItems.filter((_, i) => i !== idx))
                    }
                  >
                    Remove
                  </Button>
                </HStack>
              </HStack>
            )}
          </Box>
        ))}
      </VStack>

      {/* Add new item form */}
      {showForm && (
        <Box bg="white" p={4} borderRadius="md" mb={4}>
          <Input
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            mb={2}
          />
          <Input
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            mb={2}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity ?? ""}
            onChange={handleNumberChange("quantity")}
            mb={2}
          />
          <Input
            type="number"
            placeholder="Unit Price"
            value={newItem.unit_price ?? ""}
            onChange={handleNumberChange("unit_price")}
            mb={2}
          />
          <SelectLineItemType
            value={newItem.type}
            setNewItem={(e) => setNewItem({ ...newItem, type: e.target.value })}
          />

          <HStack mt={2}>
            <input
              type="checkbox"
              checked={newItem.saveAsTemplate}
              onChange={(e) =>
                setNewItem({ ...newItem, saveAsTemplate: e.target.checked })
              }
            />
            <Text>Save as template</Text>
          </HStack>

          <HStack paddingY={3}>
            <Button colorPalette="green" onClick={addLineItem}>
              Add
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </HStack>
        </Box>
      )}

      {!showForm && (
        <Button colorPalette={brand} onClick={() => setShowForm(true)}>
          Add New Line Item
        </Button>
      )}
    </Box>
  );
};

export default LineItemsInput;
