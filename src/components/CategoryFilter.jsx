import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useCategories } from "../context/CategoriesContext";

export function CategoryFilter({ selectedCategoryIds = [], onChange }) {
  const { categories = [] } = useCategories();
  const [selected, setSelected] = useState(selectedCategoryIds.map(String));

  // Sync local state when parent updates
  useEffect(() => {
    setSelected(selectedCategoryIds.map(String));
  }, [selectedCategoryIds]);

  // Handle selection change
  const handleChange = (vals) => {
    console.log("Selected category IDs:", vals); // Debugging
    setSelected(vals);
    onChange(vals);
  };

  // Toggle all categories
  const handleToggleAll = () => {
    if (selected.length === categories.length) {
      handleChange([]);
    } else {
      handleChange(categories.map((c) => String(c.id)));
    }
  };

  return (
    <FormControl>
      <FormLabel fontWeight="bold" mb={3}>
        Filter by Category
      </FormLabel>

      <CheckboxGroup value={selected} onChange={handleChange}>
        <Stack direction="row" wrap="wrap" spacing={4}>
          {/* All toggle */}
          <Checkbox
            value="all"
            isChecked={selected.length === categories.length}
            onChange={handleToggleAll}
            colorScheme="teal"
          >
            All
          </Checkbox>

          {/* Individual categories */}
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              value={String(category.id)}
              colorScheme="teal"
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
}
