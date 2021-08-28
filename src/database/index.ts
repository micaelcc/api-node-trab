import {createConnection, Connection} from "typeorm";
import connectionOptions from '../../ormconfig';

export default async (): Promise<Connection> => {
    return await createConnection(connectionOptions);
}
