import { Chip } from "@heroui/react";
import { capitalize } from "@/lib/utils";

const STATUS_MAP = {
  pending: { color: "warning", label: "Pending" },
  confirmed: { color: "success", label: "Confirmed" },
  cancelled: { color: "danger", label: "Cancelled" },
};

export function StatusChip({ status }) {
  const config = STATUS_MAP[status] || { color: "default", label: capitalize(status) };

  return (
    <Chip color={config.color} variant="soft" size="sm">
      {config.label}
    </Chip>
  );
}
