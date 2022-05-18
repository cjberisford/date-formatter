## Date-formatter

Assumes input data in the form of:

```json
{
  "day": [
    { 
      "type": "open", // Can be "open" or "closed"
      "value": 16000, // Time of event in seconds
    }
  ]
}
```

This app renders restaurant opening times by arranging the above data structure into a list of events that occur in a given week. These are then ordered and displayed according to the day in which they occur (specifically, open).