import AbstractBlockBuilder from '../abstracts/AbstractBlockBuilder';
export default class BlockBuilder extends AbstractBlockBuilder {
    constructor(container: object, serviceName?: string);
    /**
     * Returns an `AbstractBlock` child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * Comment out the default case if you don’t want a default block to be instantiated
     * for each block.
     *
     * @param  {String} blockType
     * @return {AbstractBlock}
     */
    getBlockInstance(blockType: string): Promise<any>;
}
//# sourceMappingURL=BlockBuilder.d.ts.map