import React from "react";
import { Stage, Container, Sprite } from "@inlet/react-pixi";

export default function TestSprite() {
  return (
    <Stage width={400} height={400}>
      <Container>
        <Sprite image="kutty.png" x={200} y={200} anchor={0.5} scale={0.5} />
      </Container>
    </Stage>
  );
}
