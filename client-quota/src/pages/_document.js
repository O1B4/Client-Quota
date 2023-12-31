// _document는 _app 다음에 실행되며, 공통적으로 활용할 <head> (Ex. 메타 태그)나 <body> 태그 안에 들어갈 내용들을 커스텀할때 활용합니다.
// 언제 사용 ? .jsx 파일에서 단순하게 HTML의 엘레먼트를 컨트롤하려고 할 때, 특히 head 태그를 컨트롤하려고 할 때 쓰면 됩니다
// 주요 사용 목적 : charset, 웹접근성 관련 태그 설정
// _document는 공통적으로 적용할 HTML 마크업을 중심으로 다룬다.

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}