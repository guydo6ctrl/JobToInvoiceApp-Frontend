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

export interface LineItem {
  name: string;
  description: string;
  quantity: number;
  unit_price: number;
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
  quantity: 1,
  unit_price: 0,
  type: "Type",
  saveAsTemplate: false,
};

const LineItemsInput = ({
  lineItems,
  onChange,
  clientId,
  selectedTemplate,
}: LineItemsInputProps) => {
  useEffect(() => {
    if (selectedTemplate) {
      onChange([
        ...lineItems,
        {
          name: selectedTemplate.description,
          description: selectedTemplate.description,
          quantity: 1,
          unit_price: parseFloat(selectedTemplate.unit_price),
          type: selectedTemplate.type,
          saveAsTemplate: false,
        },
      ]);
    }
  }, [selectedTemplate]);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState(defaultNewItem);

  // Save template if checked.
  const addLineItem = async () => {
    if (newItem.description && newItem.unit_price > 0) {
      if (newItem.saveAsTemplate) {
        await fetch("http://localhost:8000/templates/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({
            name: newItem.name,
            description: newItem.description,
            unit_price: newItem.unit_price,
            type: newItem.type,
            client_id: parseInt(clientId),
          }),
        });
      }

      onChange([...lineItems, newItem]);
      setNewItem(defaultNewItem);
      setShowForm(false);
    }
  };

  return (
    <Box>
      {/* Display existing items */}
      <VStack mb={4}>
        {lineItems.map((item, idx) => (
          <HStack key={idx} bg="white" p={2} w="full" borderRadius="md">
            <Text flex={1}>{item.name}</Text>
            <Text flex={1}>{item.description}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>Unit Price: £{item.unit_price}</Text>
            <Text>Total: £{item.unit_price * item.quantity}</Text>
            <Text>Type: {item.type}</Text>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => onChange(lineItems.filter((_, i) => i !== idx))}
            >
              Remove
            </Button>
          </HStack>
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
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
            mb={2}
          />
          <Input
            type="number"
            placeholder="Price"
            value={newItem.unit_price}
            onChange={(e) =>
              setNewItem({ ...newItem, unit_price: parseFloat(e.target.value) })
            }
            mb={2}
          />
          <NativeSelect.Root mb={2}>
            <NativeSelect.Field
              name="type"
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="Labour">Labour</option>
              <option value="Materials">Materials</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>

          <HStack>
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
            <Button colorScheme="green" onClick={addLineItem}>
              Add
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </HStack>
        </Box>
      )}

      {!showForm && (
        <Button colorScheme="blue" onClick={() => setShowForm(true)}>
          Add Line Item
        </Button>
      )}
    </Box>
  );
};

export default LineItemsInput;
