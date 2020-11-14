const shared = {
  body: {
    borderRadius: 3,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    padding: 25,
    margin: '0 auto',
    maxWidth: 780,
  },
  button: {
    border: 0,
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    padding: '10px 15px',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
    margin: 0,
  },
  title: {
    fontSize: 48,
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: 15,
  },
};

export default {
  light: {
    body: {
      ...shared.body,
      background: '#f2f7fa',
      color: '#062540',
    },
    button: {
      ...shared.button,
      background: '#016aff',
      color: '#f2f7fa',
    },
    content: {
      ...shared.content,
    },
    dark: false,
    title: {
      ...shared.title,
    },
  },
  dark: {
    body: {
      ...shared.body,
      background: '#183d5d',
      color: '#f2f7fa',
    },
    button: {
      ...shared.button,
      background: '#94c3db',
      color: '#062540',
    },
    content: {
      ...shared.content,
    },
    dark: true,
    title: {
      ...shared.title,
    },
  },
};
