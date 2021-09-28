import express, {Application} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/router';
import { Sequelize } from 'sequelize-typescript';
import { Something } from './db/models/something';
import http from 'http';
import helmet from 'helmet';

const app: Application = express();
const port = parseInt(process.env.PORT) || 8080; // default port to listen
const host = process.env.HOST || 'localhost';

app.use(express.json());
app.use(helmet());
app.disable('x-powered-by');

const spec: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'expressjs-rest-boilerplate',
      description: 'An easy boilerplate',
      version: '0.0.1',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    basePath: '/v1',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['**/*.ts'], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(spec);

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        url: 'swagger.json',
        persistAuthorization: true,
      },
      explorer: true,
    }),
);

app.use('/', routes);

export async function start(sequelize: Sequelize): Promise<void> {
  try {
    const server = http.createServer(app);

    sequelize.addModels([
      Something,
    ]);
    await sequelize.sync();

    return new Promise((resolve) => {
      server.listen(port, host.toString(), () => {
        console.log(`Server is running on http://${host}:${port}/docs`);
        resolve();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

