interface Tabs {

  routes: {
    title: string;
    callback: (data: any) => void;
    icons: {
      filled_icon: any
      outline_icon: any
    }
  }[]

}
