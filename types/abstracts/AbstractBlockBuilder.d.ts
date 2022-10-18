import AbstractService from './AbstractService';
export default class AbstractBlockBuilder extends AbstractService {
    /**
     * Returns an `AbstractBlock` child class instance
     * according to the nodeTypeName or an AbstractBlock as default.
     *
     * Comment out the default case if you don’t want a default block to be instantiated
     * for each block.
     *
     * @param  {String} _blockType
     * @return {AbstractBlock|null}
     */
    getBlockInstance(_blockType: string): Promise<null>;
}
//# sourceMappingURL=AbstractBlockBuilder.d.ts.map