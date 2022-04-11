export const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    //offset es para que no muestre cosas repetidas
    const offset = page ? page * limit : 0;
    return {limit, offset};
}