import React from "react";
import axios from "axios";
import {Token} from "../utils";
import {Button, Form, Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useErrorHandler} from "react-error-boundary";

export function OpenAISecretSettings({baseURL, setBaseURL, secretKey, setSecretKey, organization, setOrganization}) {
  const {t} = useTranslation();
  const handleError = useErrorHandler();

  const [checking, setChecking] = React.useState(false);

  const testConnection = React.useCallback(() => {
    if (!secretKey) return alert(`Invalid secret key ${secretKey}`);
    if (!baseURL) return alert(`Invalid base url ${baseURL}`);

    const urlPattern = new RegExp('^(http|https)://.+(/v1)$');
    if (!urlPattern.test(baseURL)) return alert(`Invalid BaseUrl ${baseURL}, should be http(s)://your-server/v1`);

    setChecking(true);

    axios.post('/terraform/v1/ai/transcript/check', {
      secretKey, baseURL,
    }, {
      headers: Token.loadBearerHeader(),
    }).then(res => {
      alert(`${t('helper.testOk')}: ${t('transcript.testOk')}`);
      console.log(`OpenAI: Test service ok.`);
    }).catch(handleError).finally(setChecking);
  }, [t, handleError, secretKey, baseURL, setChecking]);

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label>{t('transcript.key')}</Form.Label>
        <Form.Text> * {t('transcript.key2')}, <a href='https://platform.openai.com/api-keys' target='_blank' rel='noreferrer'>{t('helper.link')}</a></Form.Text>
        <Form.Control as="input" type='password' defaultValue={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('transcript.base')}</Form.Label>
        <Form.Text> * {t('transcript.base2')}. {t('helper.eg')} <code>https://api.openai.com/v1</code></Form.Text>
        <Form.Control as="input" defaultValue={baseURL} onChange={(e) => setBaseURL(e.target.value)} />
      </Form.Group>
      <div>
        <Button ariant="primary" type="submit" disabled={checking} onClick={(e) => {
          e.preventDefault();
          testConnection();
        }}>
          {t('transcript.test')}
        </Button> &nbsp;
        {checking && <Spinner animation="border" variant="success" style={{verticalAlign: 'middle'}} />}
        <p></p>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>{t('transcript.org')}</Form.Label>
        <Form.Text> * {t('transcript.org2')}, <a href='https://platform.openai.com/account/organization' target='_blank' rel='noreferrer'>{t('helper.link')}</a></Form.Text>
        <Form.Control as="input" defaultValue={organization} onChange={(e) => setOrganization(e.target.value)} />
      </Form.Group>
    </React.Fragment>
  );
}
