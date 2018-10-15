interface Storage {
  name: string
  body: object
  proto: string
}

/**
 * Serialize a Map into JSON
 */
export default {
  type: 'Map',
  shouldTransform(type: any, obj: any) {
    return obj && obj.constructor && obj.constructor.name === 'Map'
  },
  toSerializable(map: any): Storage {
    let body = {}

    map.forEach(function(value, key) {
      body[key] = value
    })

    return {
      name: 'Map',
      body,
      proto: Object.getPrototypeOf(map).constructor.name
    }
  },
  fromSerializable(data: Storage) {
    const { body } = data
    let obj = { ...body }

    if (typeof data.proto === 'string') {
      // @ts-ignore
      obj.constructor = {
        name: data.proto
      }
    }

    return obj
  }
}
