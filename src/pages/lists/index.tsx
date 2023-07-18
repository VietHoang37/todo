import Form from "@/components/form/Form";
import React, { useState } from "react";

const Lists: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(true);

  if (isEmpty) {
    return <Form />;
  }

  return <div>Lists</div>;
};

export default Lists;
