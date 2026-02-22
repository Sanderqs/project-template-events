import React from "react";
import { Box, Text, Stack, RadioGroup } from "@chakra-ui/react";
import { useCategories } from "../context/CategoriesContext";

export function CategoryFilter({ selectedCategory, onChange }) {
  const { categories = [] } = useCategories();

  return (
    <Box mb={6}>
      <Text mb={3} fontWeight="bold">
        Filter by Category
      </Text>

      <RadioGroup.Root
        value={selectedCategory}
        onValueChange={(details) => onChange(details.value)}
      >
        <Stack direction="row">
          <RadioGroup.Item value="">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>All</RadioGroup.ItemText>
          </RadioGroup.Item>

          {categories.map((category) => (
            <RadioGroup.Item key={category.id} value={String(category.id)}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{category.name}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </Stack>
      </RadioGroup.Root>
    </Box>
  );
}
