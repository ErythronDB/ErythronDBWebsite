
export interface RecordHeaderAttributes {
    displayName: string,
    attributes: {
    source_id: string,
    symbol: string,
    synonym?: string,
    product: string,
    gene_type: string,
    ortholog_record_link?: any,
    locus?: string,
    location: string,
    chromosome: string
    start_min: number,
    end_max: number
}
}

export interface HeaderActions {
    iconClassName: string;
    onClick: any;
    label: string;
}

export interface HeaderActions {
    iconClassName: string;
    onClick: any;
    label: string;
}