type ExtensionType = "helloA" | "helloB";

export interface ExtensionConfig {
  type: ExtensionType;
  render: (...args: any[]) => any;
}

const renderA = (props: { nameA: string; descriptionA?: string }) => {
  return props.nameA;
};

const extensionA = {
  type: "helloA" as const,
  render: renderA,
};

const renderB = (props: { classnameB: string; descriptionB?: string }) => {
  return props.classnameB;
};

const extensionB = {
  type: "helloB",
  render: renderB,
} satisfies ExtensionConfig;

const extensions = [extensionA, extensionB];

export type Extension = (typeof extensions)[number];
// TODO
export function renderExtension<T extends ExtensionType>(options: {
  type: T;
  props: Parameters<Extract<Extension, { type: T }>["render"]>[0];
}) {}

// 类型推导正常
renderExtension({
  type: "helloA",
  props: {
    nameA: "helloa",
  },
});

// 类型推导正常
renderExtension({
  type: "helloB",
  props: {
    classnameB: "world",
  },
});

// 类型推导异常
renderExtension({
  type: "helloB",
  props: {
    classnameB: "hello",
  },
});
