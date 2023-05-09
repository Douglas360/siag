BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[t_log] DROP CONSTRAINT [t_log_id_user_fkey];

-- AlterTable
ALTER TABLE [dbo].[t_log] ALTER COLUMN [id_user] INT NULL;
ALTER TABLE [dbo].[t_log] ALTER COLUMN [id_empresa] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[t_log] ADD CONSTRAINT [t_log_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_user]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
