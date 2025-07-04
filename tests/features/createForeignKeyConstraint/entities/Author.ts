import {
  Collection,
  Entity,
  OneToMany,
  Property,
  ManyToMany,
  OneToOne,
} from '@mikro-orm/core';
import { Book } from './Book';
import { BaseEntity } from './BaseEntity';
import { AuthorAddress } from './AuthorAddress';

@Entity()
export class Author extends BaseEntity {

  @Property()
  name: string;

  @OneToMany({ entity: () => Book, mappedBy: 'author' })
  books = new Collection<Book>(this);

  @OneToOne({ entity: () => AuthorAddress, mappedBy: 'author' })
  address: AuthorAddress;

  @ManyToMany({ entity: () => Author })
  following = new Collection<Author>(this);

  @ManyToMany({ entity: () => Author, mappedBy: 'following' })
  followers = new Collection<Author>(this);

  constructor(name: string, address: AuthorAddress) {
    super();
    this.name = name;
    this.address = address;
  }

}
