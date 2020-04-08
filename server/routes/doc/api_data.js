define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "/Users/eva/Documents/Nodejs/HW3/server/routes/doc/main.js",
    "groupTitle": "/Users/eva/Documents/Nodejs/HW3/server/routes/doc/main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login endpoint.",
    "name": "Login",
    "group": "Auth",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{\n   username: \"Kyrylo\",\n   password: \"test1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n status: \"User authenticated successfully\",\n token: \"fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "Register new user.",
    "name": "Register",
    "group": "Auth",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User type (driver or shipper), shoudnt be case sensitive.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{\n   username: \"Kyrylo\",\n   password: \"test1234\",\n   role: \"driver\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n status: \"User registered successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "patch",
    "url": "/api/loads/:id/state",
    "title": "Change load state(only driver has access, for only active load).",
    "name": "Change_load_state",
    "group": "Load",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n status: \"Load status changed successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./load.route.js",
    "groupTitle": "Load"
  },
  {
    "type": "patch",
    "url": "/api/loads/:id/state",
    "title": "Change load state(only driver has access, for only active load).",
    "name": "Change_load_state",
    "group": "Load",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n status: \"Load status changed successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./load.route.js",
    "groupTitle": "Load"
  },
  {
    "type": "post",
    "url": "/api/loads",
    "title": "Create load(only shipper has access).",
    "name": "Create_load",
    "group": "Load",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "content-type header example:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>Load dimensions.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "payload",
            "description": "<p>Load weight.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{\n   \"payload\": 100, \n   \"dimensions\": {\n       length: 100, \n       width: 100, \n       height: 100\n   } \n }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n status: \"Load created successfully\"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./load.route.js",
    "groupTitle": "Load"
  },
  {
    "type": "get",
    "url": "/api/loads/",
    "title": "Retreive active for this driver loads.",
    "name": "Get_loads_of_driver",
    "group": "Load",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "loads",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n \"status\": \"Success\"\n \"loads\": [\n   {\n       \"_id\": \"fbawfibaw\",\n       \"assigned_to\": \"noifawnfoian\",\n       \"created_by\": \"jfnaikfna\",\n       \"status\": \"ASSIGNED\",\n       \"state\": \"En route to Pick Up\",\n       \"logs\": [{\"message\": \"Load created\", time: 12312}],\n       \"payload\": 100,\n       \"dimensions\": {length: 100, width: 100, height: 100}\n       \"...\": \"...\"\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./load.route.js",
    "groupTitle": "Load"
  },
  {
    "type": "get",
    "url": "/api/loads/",
    "title": "Retreive list of loads(for this shipper).",
    "name": "Get_loads_of_shipper",
    "group": "Load",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "loads",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n \"status\": \"Success\"\n \"loads\": [\n   {\n       \"_id\": \"fbawfibaw\",\n       \"assigned_to\": \"noifawnfoian\",\n       \"created_by\": \"jfnaikfna\",\n       \"status\": \"NEW\",\n       \"state\": \"En route to Pick Up\",\n       \"logs\": [{\"message\": \"Load created\", time: 12312}],\n       \"payload\": 100,\n       \"dimensions\": {length: 100, width: 100, height: 100}\n       \"...\": \"...\"\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./load.route.js",
    "groupTitle": "Load"
  },
  {
    "type": "patch",
    "url": "/api/loads/:id/post",
    "title": "Post load(only shipped has access).",
    "name": "Post_load",
    "group": "Load",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n \"status\": \"Load posted successfully\",\n \"assigned_to\": \"somebody\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "No driver found response:",
          "content": "    HTTP/1.1 404 Not Found\n{\n \"status\": \"No drivers found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./load.route.js",
    "groupTitle": "Load"
  },
  {
    "type": "post",
    "url": "/api/trucks",
    "title": "Create truck(only driver has access).",
    "name": "Create_truck",
    "group": "Truck",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "content-type header example:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Truck type(SPRINTER, SMALL STRAIGHT, LARGE STRAIGHT).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{\n  \"type\": \"SPRINTER\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n status: \"Truck created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./driver.route.js",
    "groupTitle": "Truck"
  },
  {
    "type": "get",
    "url": "/api/trucks",
    "title": "Retreive list of trucks(for this driver).",
    "name": "Get_trucks",
    "group": "Truck",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"status\": \"Truck created successfully\"\n   \"trucks\": [\n     {\n       \"_id\": \"fbawfibaw\",\n       \"assigned_to\": \"\",\n       \"status\": \"OS\",\n       \"created_by\": \"fbawfibaw\",\n       \"type\": \"SPRINTER\",\n       \"...\": \"...\"\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./driver.route.js",
    "groupTitle": "Truck"
  },
  {
    "type": "patch",
    "url": "/api/trucks/:id/assign",
    "title": "Assign driver to truck with specified id.",
    "name": "Register",
    "group": "Truck",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "authorization header example:",
          "content": "{\n  \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "    HTTP/1.1 200 OK\n{\n status: \"Truck assigned successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./driver.route.js",
    "groupTitle": "Truck"
  }
] });