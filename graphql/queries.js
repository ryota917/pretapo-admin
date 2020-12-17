/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      description
      stateDescription
      imageURLs
      status
      season
      bigCategory
      smallCategory
      color
      dressLength
      dressWidth
      sleeveLength
      waist
      hip
      rise
      inseam
      hemWidth
      size
      brand
      supplierName
      material
      rank
      itemCarts {
        nextToken
      }
      itemCartLogs {
        nextToken
      }
      favoriteUser {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        stateDescription
        imageURLs
        status
        season
        bigCategory
        smallCategory
        color
        dressLength
        dressWidth
        sleeveLength
        waist
        hip
        rise
        inseam
        hemWidth
        size
        brand
        supplierName
        material
        rank
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      nameKana
      phoneNumber
      address
      postalCode
      height
      birthday
      gender
      rental
      cartId
      customerId
      registered
      cart {
        id
        userId
        createdAt
        updatedAt
      }
      cartLogs {
        nextToken
      }
      favoriteItem {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        nameKana
        phoneNumber
        address
        postalCode
        height
        birthday
        gender
        rental
        cartId
        customerId
        registered
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCart = /* GraphQL */ `
  query GetCart($id: ID!) {
    getCart(id: $id) {
      id
      userId
      user {
        id
        name
        nameKana
        phoneNumber
        address
        postalCode
        height
        birthday
        gender
        rental
        cartId
        customerId
        registered
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      itemCarts {
        nextToken
      }
    }
  }
`;
export const listCarts = /* GraphQL */ `
  query ListCarts(
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCartLog = /* GraphQL */ `
  query GetCartLog($id: ID!) {
    getCartLog(id: $id) {
      id
      userId
      createdAt
      user {
        id
        name
        nameKana
        phoneNumber
        address
        postalCode
        height
        birthday
        gender
        rental
        cartId
        customerId
        registered
        createdAt
        updatedAt
      }
      itemCartLogs {
        nextToken
      }
      updatedAt
    }
  }
`;
export const listCartLogs = /* GraphQL */ `
  query ListCartLogs(
    $filter: ModelCartLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCartLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      text
      room
      user
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        room
        user
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItemCart = /* GraphQL */ `
  query GetItemCart($id: ID!) {
    getItemCart(id: $id) {
      id
      itemId
      cartId
      item {
        id
        name
        description
        stateDescription
        imageURLs
        status
        season
        bigCategory
        smallCategory
        color
        dressLength
        dressWidth
        sleeveLength
        waist
        hip
        rise
        inseam
        hemWidth
        size
        brand
        supplierName
        material
        rank
        createdAt
        updatedAt
      }
      cart {
        id
        userId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItemCarts = /* GraphQL */ `
  query ListItemCarts(
    $filter: ModelItemCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemId
        cartId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItemCartLog = /* GraphQL */ `
  query GetItemCartLog($id: ID!) {
    getItemCartLog(id: $id) {
      id
      itemId
      cartLogId
      item {
        id
        name
        description
        stateDescription
        imageURLs
        status
        season
        bigCategory
        smallCategory
        color
        dressLength
        dressWidth
        sleeveLength
        waist
        hip
        rise
        inseam
        hemWidth
        size
        brand
        supplierName
        material
        rank
        createdAt
        updatedAt
      }
      cartLog {
        id
        userId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItemCartLogs = /* GraphQL */ `
  query ListItemCartLogs(
    $filter: ModelItemCartLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemCartLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemId
        cartLogId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItemFavorite = /* GraphQL */ `
  query GetItemFavorite($id: ID!) {
    getItemFavorite(id: $id) {
      id
      itemId
      userId
      item {
        id
        name
        description
        stateDescription
        imageURLs
        status
        season
        bigCategory
        smallCategory
        color
        dressLength
        dressWidth
        sleeveLength
        waist
        hip
        rise
        inseam
        hemWidth
        size
        brand
        supplierName
        material
        rank
        createdAt
        updatedAt
      }
      user {
        id
        name
        nameKana
        phoneNumber
        address
        postalCode
        height
        birthday
        gender
        rental
        cartId
        customerId
        registered
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItemFavorites = /* GraphQL */ `
  query ListItemFavorites(
    $filter: ModelItemFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchItems = /* GraphQL */ `
  query SearchItems(
    $filter: SearchableItemFilterInput
    $sort: SearchableItemSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchItems(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        stateDescription
        imageURLs
        status
        season
        bigCategory
        smallCategory
        color
        dressLength
        dressWidth
        sleeveLength
        waist
        hip
        rise
        inseam
        hemWidth
        size
        brand
        supplierName
        material
        rank
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchCartLogs = /* GraphQL */ `
  query SearchCartLogs(
    $filter: SearchableCartLogFilterInput
    $sort: SearchableCartLogSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchCartLogs(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchMessages = /* GraphQL */ `
  query SearchMessages(
    $filter: SearchableMessageFilterInput
    $sort: SearchableMessageSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchMessages(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        room
        user
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchItemCarts = /* GraphQL */ `
  query SearchItemCarts(
    $filter: SearchableItemCartFilterInput
    $sort: SearchableItemCartSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchItemCarts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        itemId
        cartId
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchItemCartLogs = /* GraphQL */ `
  query SearchItemCartLogs(
    $filter: SearchableItemCartLogFilterInput
    $sort: SearchableItemCartLogSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchItemCartLogs(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        itemId
        cartLogId
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchItemFavorites = /* GraphQL */ `
  query SearchItemFavorites(
    $filter: SearchableItemFavoriteFilterInput
    $sort: SearchableItemFavoriteSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchItemFavorites(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        itemId
        userId
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
