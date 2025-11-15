import { Button, Title } from "@app/utility";

export default function Root(props) {
  return (
    <>
      <Title text={`Product TITLE ${props.name}`} />
      <Button>PRODUCT</Button>
    </>
  );
}
