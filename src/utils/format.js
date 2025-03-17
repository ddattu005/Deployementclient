// Format numbers as currency (e.g., $10,000.00)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  
  // Format dates in a readable format
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  // Convert percentage to display format (e.g., +5.25% or -3.10%)
  export const formatPercentage = (value) => {
    const formatted = `${value.toFixed(2)}%`;
    return value >= 0 ? `+${formatted}` : formatted;
  };
  