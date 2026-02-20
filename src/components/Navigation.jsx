import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <Flex gap={2} p={4}>
        <Button variant="link" onClick={() => navigate("/")}>
          Events
        </Button>
        <Button colorScheme="teal" onClick={() => navigate("/add-event")}>
          Add Event
        </Button>
      </Flex>
    </nav>
  );
};
