BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_modelo_doc] (
    [id_doc_type] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    [number_document] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [file] NVARCHAR(1000) NOT NULL,
    [id_empresa] INT NOT NULL,
    [id_user] INT NOT NULL,
    [dt_criado] DATETIME2 NOT NULL CONSTRAINT [t_modelo_doc_dt_criado_df] DEFAULT CURRENT_TIMESTAMP,
    [dt_atualizado] DATETIME2 NOT NULL,
    CONSTRAINT [t_modelo_doc_pkey] PRIMARY KEY CLUSTERED ([id_doc_type]),
    CONSTRAINT [t_modelo_doc_descricao_key] UNIQUE NONCLUSTERED ([descricao])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
