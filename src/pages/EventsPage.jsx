import { Heading } from "@chakra-ui/react";
import { fetchAllData } from "../services/api";

export const EventsPage = () => {
  fetchAllData();
  return <Heading>List of events</Heading>;
};
