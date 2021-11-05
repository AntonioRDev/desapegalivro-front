import React from "react";
import { Select, SelectProps } from "@chakra-ui/select";

type Props = SelectProps & {};

const SelectComponent: React.FC<Props> = (props) => {
  const { children, ...rest } = props;

  return <Select  {...rest}>{children}</Select>;
};

export default SelectComponent;
