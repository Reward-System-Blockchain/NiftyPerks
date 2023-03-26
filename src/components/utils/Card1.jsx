import { Card, Col, Text } from "@nextui-org/react";

export const Card1 = (props) => {
  const { imageSrc, tier, points, id } = props;
  return (
    <Card css={{ bg: "$black", w: "100%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            {id}
          </Text>
          <Text h4 color="white">
            {tier}
          </Text>
          <Text h4 color="white">
            {points}
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src={imageSrc}
        width="100%"
        height={340}
        objectFit="cover"
        alt="Card image background"
      />
    </Card>
  );
};
