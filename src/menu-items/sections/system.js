import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const system = {
    id: "group-system",
    title: "Système",
    type: "group",
    children: [
        {
            id: "cron-logs",
            title: "Logs Système",
            type: "item",
            url: "/cron-logs",
            icon: ReceiptLongIcon,
            breadcrumbs: false,
        },
    ],
};

export default system;
