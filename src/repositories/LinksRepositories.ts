import { EntityRepository, Repository } from "typeorm";
import {Link} from '../models/Link'

@EntityRepository(Link)
class LinksRepository extends Repository<Link>{

}

export {LinksRepository}