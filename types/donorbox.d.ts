declare namespace JSX {
  interface IntrinsicElements {
    'dbox-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        campaign?: string
        type?: string
        interval?: string
        'enable-auto-scroll'?: string
      },
      HTMLElement
    >
  }
}
