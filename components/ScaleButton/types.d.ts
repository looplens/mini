interface ScaleButton {
  children: any;
  onPress?: any;
  activeScale?: number;
  springConfig?: {
    damping: number;
    mass: number;
    stiffness: number;
  };
  contentContainerStyle?: any;
  handlerProps?: any
}
