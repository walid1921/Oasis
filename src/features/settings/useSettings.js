import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    error,
    data: settings,
    loading,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    error,
    settings,
    loading,
  };
}
