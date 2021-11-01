# Xbox Games API
> ⚡️ Given a set of origins or urls returns its core web vitals metrics from Chrome UX Report.

The Web Vitals API was built for simplicity to compare multiple domains or urls with a single request.

```
curl https://crux.pazguille.me/api/web-vitals?origins=https://reactjs.org,https://vuejs.org
```

<details>
  <summary>Click to Expand Results</summary>

  ```json
  [
    {
      "origin": "https://reactjs.org",
      "metrics": {
        "CLS": {
          "histogram": [{
            "start": "0.00",
            "end": "0.10",
            "density": 98.49
          }, {
            "start": "0.10",
            "end": "0.25",
            "density": 0.54
          }, {
            "start": "0.25",
            "density": 0.97
          }],
          "value": "0.04"
        },
        "FCP": {
          "histogram": [{
            "start": 0,
            "end": 1000,
            "density": 51.55
          }, {
            "start": 1000,
            "end": 3000,
            "density": 44.2
          }, {
            "start": 3000,
            "density": 4.26
          }],
          "value": 1404
        },
        "FID": {
          "histogram": [{
            "start": 0,
            "end": 100,
            "density": 90.76
          }, {
            "start": 100,
            "end": 300,
            "density": 4.99
          }, {
            "start": 300,
            "density": 4.25
          }],
          "value": 45
        },
        "LCP": {
          "histogram": [{
            "start": 0,
            "end": 2500,
            "density": 93.31
          }, {
            "start": 2500,
            "end": 4000,
            "density": 4.33
          }, {
            "start": 4000,
            "density": 2.36
          }],
          "value": 1421
        }
      }
    }, {
      "origin": "https://vuejs.org",
      "metrics": {
        "FID": {
          "histogram": [{
            "start": 0,
            "end": 100,
            "density": 96.68
          }, {
            "start": 100,
            "end": 300,
            "density": 2.62
          }, {
            "start": 300,
            "density": 0.7
          }],
          "value": 21
        },
        "LCP": {
          "histogram": [{
            "start": 0,
            "end": 2500,
            "density": 88.89
          }, {
            "start": 2500,
            "end": 4000,
            "density": 7.32
          }, {
            "start": 4000,
            "density": 3.79
          }],
          "value": 1565
        },
        "CLS": {
          "histogram": [{
            "start": "0.00",
            "end": "0.10",
            "density": 74.79
          }, {
            "start": "0.10",
            "end": "0.25",
            "density": 18.95
          }, {
            "start": "0.25",
            "density": 6.27
          }],
          "value": "0.10"
        },
        "FCP": {
          "histogram": [{
            "start": 0,
            "end": 1000,
            "density": 62.26
          }, {
            "start": 1000,
            "end": 3000,
            "density": 31.32
          }, {
            "start": 3000,
            "density": 6.42
          }],
          "value": 1368
        }
      }
    }
  ]
  ```
</details>

### Endpoint
```
https://crux.pazguille.me/api/web-vitals
```

### Query Parameters

| Param  | Type    | Required | Description                                                                                                                                                  |
|--------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| origins | string  | false     | A comma-separated list of domains. All data present for all pages in that domain are aggregated together.                                               |
| urls | string  | false     | A comma-separated list of specific urls. Only data for that specific url will be returned.                                               |

### Response [WIP]
A structure with the following shape:

| Property  | Type    | Description                                                                                                                                                  |
|--------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| origin or url | string  |                                                |
| metrics | object  |                                                |

## With ❤ by

- Guille Paz (Frontend Web Developer & Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](https://twitter.com/pazguille)
- Web: [https://pazguille.me](https://pazguille.me)

## License

MIT license. Copyright © 2020.
