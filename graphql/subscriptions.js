/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateCart = /* GraphQL */ `
  subscription OnCreateCart {
    onCreateCart {
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
export const onUpdateCart = /* GraphQL */ `
  subscription OnUpdateCart {
    onUpdateCart {
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
export const onDeleteCart = /* GraphQL */ `
  subscription OnDeleteCart {
    onDeleteCart {
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
export const onCreateCartLog = /* GraphQL */ `
  subscription OnCreateCartLog {
    onCreateCartLog {
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
export const onUpdateCartLog = /* GraphQL */ `
  subscription OnUpdateCartLog {
    onUpdateCartLog {
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
export const onDeleteCartLog = /* GraphQL */ `
  subscription OnDeleteCartLog {
    onDeleteCartLog {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      text
      room
      user
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      text
      room
      user
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      text
      room
      user
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItemCart = /* GraphQL */ `
  subscription OnCreateItemCart {
    onCreateItemCart {
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
export const onUpdateItemCart = /* GraphQL */ `
  subscription OnUpdateItemCart {
    onUpdateItemCart {
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
export const onDeleteItemCart = /* GraphQL */ `
  subscription OnDeleteItemCart {
    onDeleteItemCart {
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
export const onCreateItemCartLog = /* GraphQL */ `
  subscription OnCreateItemCartLog {
    onCreateItemCartLog {
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
export const onUpdateItemCartLog = /* GraphQL */ `
  subscription OnUpdateItemCartLog {
    onUpdateItemCartLog {
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
export const onDeleteItemCartLog = /* GraphQL */ `
  subscription OnDeleteItemCartLog {
    onDeleteItemCartLog {
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
export const onCreateItemFavorite = /* GraphQL */ `
  subscription OnCreateItemFavorite {
    onCreateItemFavorite {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItemFavorite = /* GraphQL */ `
  subscription OnUpdateItemFavorite {
    onUpdateItemFavorite {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItemFavorite = /* GraphQL */ `
  subscription OnDeleteItemFavorite {
    onDeleteItemFavorite {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
