import { message } from "antd";

export const alert = {
  success(content, duration = 2) {
    message.success({
      content,
      duration,
    });
  },

  error(content, duration = 3) {
    message.error({
      content,
      duration,
    });
  },

  warning(content, duration = 3) {
    message.warning({
      content,
      duration,
    });
  },

  info(content, duration = 2) {
    message.info({
      content,
      duration,
    });
  },

  loading(content = "Loading...") {
    return message.loading({
      content,
      duration: 0,
    });
  },
};