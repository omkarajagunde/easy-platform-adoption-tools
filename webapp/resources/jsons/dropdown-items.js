
export const ShowByItems = [
    { id: "item-0", label: "Today" },
    { id: "item-1", label: "Yesterday" },
    { id: "item-2", label: "Current Week" },
    { id: "item-3", label: "Last Week" },
    { id: "item-4", label: "Current Month" },
    { id: "item-5", label: "Last Month" },
    { id: "item-6", label: "Current Quarter" },
    { id: "item-7", label: "Last Quarter" },
    { id: "item-8", label: "Current Year" },
    { id: "item-9", label: "Last Year" },
    { id: "item-10", label: "All Data" },
]

export const FilterItemsForTrailOrders = [
    { id: "status", label: "status" },
    { id: "partNumber", label: "Part number" },
    { id: "emailAddress", label: "Email address" },
    { id: "requestId", label: "Request id" },
    { id: "userId", label: "User Id" },
    { id: "exceptionCode", label: "Exception Code" },
    { id: "httpExceptionCode", label: "HTTP Code" },
]

export const FilterItemsForTrailOrdersByStatus = [
    { id: "Success", label: "Success" },
    { id: "Failed", label: "Failed" },
    { id: "Processing", label: "Processing" },
    { id: "Completed", label: "Completed" },
]

export const TrialOrdersMeterChart = {
    "title": "Meter Chart: Success/Failed/Porcessing states",
    "height": "120px",
    "meter": {
      "proportional": {
        "total": 0,
        "unit": ""
      }
    },
    "color": {
      "pairing": {
        "option": 3
      }
    }
}

export const TrialOrdersHorizontalChart = {
  "title": "Horizontal simple bar (discrete)",
  "axes": {
    "left": {
      "mapsTo": "group",
      "scaleType": "labels"
    },
    "bottom": {
      "mapsTo": "value"
    }
  },
  "height": "700px"
}
