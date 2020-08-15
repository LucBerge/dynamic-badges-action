const core = require('@actions/core');
const http = require('http');

try {
  let description = {
    schemaVersion: 1,
    label: core.getInput('label'),
    message: core.getInput('message')
  };

  const labelColor = core.getInput('label-color');
  const color = core.getInput('color');
  const isError = core.getInput('is-error');
  const namedLogo = core.getInput('named-logo');
  const logoSvg = core.getInput('logo-svg');
  const logoColor = core.getInput('logo-color');
  const logoWidth = core.getInput('logo-width');
  const logoPosition = core.getInput('logo-position');
  const style = core.getInput('style');
  const cacheSeconds = core.getInput('cache-seconds');


  if (labelColor != undefined) {
    description.labelColor = labelColor;
  }

  if (color != undefined) {
    description.labelColor = color;
  }

  if (isError != undefined) {
    description.isError = isError;
  }

  if (namedLogo != undefined) {
    description.namedLogo = namedLogo;
  }

  if (logoSvg != undefined) {
    description.logoSvg = logoSvg;
  }

  if (logoColor != undefined) {
    description.logoColor = logoColor;
  }

  if (logoWidth != undefined) {
    description.logoWidth = logoWidth;
  }

  if (logoPosition != undefined) {
    description.logoPosition = logoPosition;
  }

  if (style != undefined) {
    description.style = style;
  }

  if (cacheSeconds != undefined) {
    description.cacheSeconds = cacheSeconds;
  }

  let data = {files: {}};
  data.files[core.getInput('badge-name')] = {
    content: JSON.stringify(description)
  };

  const req = http.request(
      {
        host: 'api.github.com',
        path: '/gists/' + core.getInput('gist-id'),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + core.getInput('auth'),
        }
      },
      res => {
        console.log('foooo!');
        let body = '';

        res.on('data', data => {
          body += data;
        });

        res.on('end', () => {
          console.log(body);
        });
      });

  req.write(JSON.stringify(data));
  req.end();

} catch (error) {
  core.setFailed(error);
}