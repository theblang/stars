export default interface Serializable<T> {
    toJSON: () => object;
}
